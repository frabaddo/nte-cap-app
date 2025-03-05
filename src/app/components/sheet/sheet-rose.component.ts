import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  signal,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { SheetRoseExagonComponent } from "./components/sheet-rose-exagon/sheet-rose-exagon.component";
import {
  Gesture,
  GestureController,
  GestureDetail,
  ModalController,
} from "@ionic/angular";
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  startWith,
  Subject,
  Subscription,
  switchMap,
  tap,
} from "rxjs";
import { SheetRoseEditorComponent } from "./components/sheet-rose-editor/sheet-rose-editor.component";

export type HexagonInfos = {
  text: string;
  image: string | null;
};

const exampleRowCel: () => HexagonInfos = () => ({
  text: "", //"Lorem ipsum dolor sit amet",
  image:
    // Math.random() >= 0.5
    //   ? "https://www.svgrepo.com/show/532035/cloud-bolt.svg"
    //   : Math.random() >= 0.5
    //   ? "https://cdn.vectorstock.com/i/1000v/48/06/devil-ui-icon-dark-fantasy-game-sign-vector-43854806.jpg"
    //   :
    null,
});

@Component({
  selector: "app-sheet-rose",
  templateUrl: "./sheet-rose.component.html",
  styleUrls: ["./sheet-rose.component.scss"],
  imports: [SheetRoseExagonComponent],
})
export class SheetRoseComponent implements AfterViewInit {
  gestureCtrl = inject(GestureController);
  modalCtrl = inject(ModalController);
  element = inject(ElementRef);

  saveName = input("sheet");

  gesture: Gesture;

  isGestureActive = new BehaviorSubject<boolean>(false);
  lastPositionRecorded = signal<[number, number] | false>(false);
  onMoveGestureObs = new Subject<GestureDetail>();

  lastTime = signal(0);

  openedModal = signal<[number, number] | false>(false);
  openedModal$ = toObservable(this.openedModal);

  sheet = signal<HexagonInfos[][]>([
    new Array(1).fill(exampleRowCel()),
    new Array(2).fill(exampleRowCel()),
    new Array(3).fill(exampleRowCel()),
    new Array(2).fill(exampleRowCel()),
    new Array(3).fill(exampleRowCel()),
    new Array(2).fill(exampleRowCel()),
    new Array(3).fill(exampleRowCel()),
    new Array(2).fill(exampleRowCel()),
    new Array(1).fill(exampleRowCel()),
  ]);

  effectSaveSheet = effect(() => {
    localStorage.setItem(this.saveName(), JSON.stringify(this.sheet()));
  });

  constructor() {
    if (localStorage.getItem(this.saveName()))
      this.sheet.set(JSON.parse(localStorage.getItem(this.saveName())));
  }

  handleOnMove = this.onMoveGestureObs.pipe(
    map((event) => {
      let elements = event
        ? document
            .elementsFromPoint(event.currentX, event.currentY)
            .filter((el) => el.classList.contains("exagon"))
        : [];
      let el = elements?.[0] ?? undefined;
      return el
        ? {
            element: [
              +el.getAttribute("data-row"),
              +el.getAttribute("data-col"),
            ] as [number, number],
            event,
          }
        : { element: undefined, event };
    }),
    tap((ev) => {
      if (this.openedModal() === false) this.lastTime.set(ev.event.currentTime);
    }),
    distinctUntilChanged((prev, next) => {
      if (this.openedModal() !== false)
        return (
          this.lastPositionRecorded() &&
          next.event &&
          !this.haveMovedAmount(
            next.event,
            this.lastPositionRecorded() as [number, number]
          )
        );
      return (
        (!next.element && !prev.element) ||
        (next.element &&
          prev.element &&
          next.element[0] === prev.element[0] &&
          next.element[1] === prev.element[1] &&
          !(this.lastTime() + 1000 > next.event.currentTime))
      );
    }),
    switchMap((ev) => {
      return this.isGestureActive.pipe(
        map((active) => {
          return active ? ev : { element: undefined, event: undefined };
        })
      );
    }),
    tap((val) => this.openExagon(val))
  );

  ngAfterViewInit(): void {
    let currentSub: Subscription | undefined = undefined;
    this.gesture = this.gestureCtrl.create(
      {
        el: this.element.nativeElement,
        threshold: 0,
        gestureName: "openHexagonOnHover",
        onStart: (event) => {
          event.event.preventDefault();
          currentSub = this.handleOnMove.subscribe();
          this.isGestureActive.next(true);
          this.onMoveGestureObs.next(event);
        },
        onMove: (event) => {
          event.event.preventDefault();
          this.onMoveGestureObs.next(event);
        },
        onEnd: (event) => {
          if (this.openedModal())
            this.openEdit(this.openedModal()[0], this.openedModal()[1]);
          event.event.preventDefault();
          this.isGestureActive.next(false);
          this.openedModal.set(false);
          this.lastPositionRecorded.set(false);
          if (currentSub) {
            currentSub.unsubscribe();
            currentSub = undefined;
          }
        },
      },
      true
    );

    this.gesture.enable();
  }

  openExagon(value: {
    element: undefined | [number, number];
    event: GestureDetail;
  }) {
    if (this.openedModal() && !value.element) {
      this.openedModal.set(false);
      this.lastPositionRecorded.set(false);
    } else {
      this.lastPositionRecorded.set(
        value.event ? [value.event.currentX, value.event.currentY] : false
      );
      this.openedModal.set(value.element);
    }
  }

  haveMovedAmount(event: GestureDetail, last: [number, number]) {
    return (
      event.currentX > last[0] + 5 ||
      event.currentX < last[0] - 5 ||
      event.currentY > last[1] + 5 ||
      event.currentY < last[1] - 5
    );
  }

  openEdit(row: number, cel: number) {
    let hexInfo = this.sheet()[row][cel];
    this.modalCtrl
      .create({
        component: SheetRoseEditorComponent,
        componentProps: {
          text: hexInfo.text,
          image: hexInfo.image,
        },
      })
      .then((modal) => {
        modal.onDidDismiss().then((ev) => {
          if (ev.data)
            this.sheet.update((_sheet) => {
              let sheet = structuredClone(_sheet);
              sheet[row][cel] = ev.data;
              return sheet;
            });
        });
        modal.present();
      });
  }
}
