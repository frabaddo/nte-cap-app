export enum SheetExagonType {
    quality = 'quality',
    skill = 'skill',
    archetype = 'archetype',
    curse = 'curses'
}

export interface SheetExagon{
    type: SheetExagonType
    text: string
    position: [column: number, index: number]
}