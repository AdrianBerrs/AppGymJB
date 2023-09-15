export type Exercise = {
    _id?: string
    name: string; 
    checked: boolean
}

export type Session = { 
    _id?: string
    date: Date
    name: string
    expanded: boolean
    exercises: Exercise[] 
}