import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { SheetRoseExagonComponent } from "./components/sheet-rose-exagon/sheet-rose-exagon.component";
import { Gesture, GestureController, GestureDetail } from "@ionic/angular";
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  of,
  startWith,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from "rxjs";

@Component({
  selector: "app-sheet-rose",
  templateUrl: "./sheet-rose.component.html",
  styleUrls: ["./sheet-rose.component.scss"],
  imports: [SheetRoseExagonComponent],
})
export class SheetRoseComponent implements AfterViewInit {
  gestureCtrl = inject(GestureController);
  element = inject(ElementRef);

  gesture: Gesture;

  isGestureActive = new BehaviorSubject<boolean>(false);
  lastPositionRecorded = signal<[number, number] | false>(false);
  onMoveGestureObs = new Subject<GestureDetail>();

  lastTime = signal(0);

  openedModal = signal<[number, number] | false>(false);
  openedModal$ = toObservable(this.openedModal);

  sheet = signal([
    new Array(1).fill(false),
    new Array(2).fill(false),
    new Array(3).fill(false),
    new Array(2).fill(false),
    new Array(3).fill(false),
    new Array(2).fill(false),
    new Array(3).fill(false),
    new Array(2).fill(false),
    new Array(1).fill(false),
  ]);

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
      return (
        (this.openedModal() !== false &&
          this.lastPositionRecorded() &&
          next.event &&
          this.haveMovedAmount(
            next.event,
            this.lastPositionRecorded() as [number, number]
          )) ||
        (this.openedModal() === false &&
          ((!next.element && !prev.element) ||
            (next.element &&
              prev.element &&
              next.element[0] === prev.element[0] &&
              next.element[1] === prev.element[1] &&
              !(this.lastTime() + 1000 > next.event.currentTime))))
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
          this.isGestureActive.next(true);
          this.onMoveGestureObs.next(event);
          currentSub = this.handleOnMove.subscribe();
        },
        onMove: (event) => this.onMoveGestureObs.next(event),
        onEnd: () => {
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
    if (this.openedModal()) {
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
    return !(
      event.currentX > last[0] + 50 ||
      event.currentX < last[0] - 50 ||
      event.currentY > last[1] + 50 ||
      event.currentY < last[1] - 50
    );
  }
}
