export type Exercise = {
    name: string; 
    checked: boolean
}

export type Session = { 
    date: Date
    name: string
    expanded: boolean
    exercises: Exercise[] 
}