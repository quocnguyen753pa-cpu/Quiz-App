import { Answer } from "./answer"

export type User = {
    username: string
    saveAnswers: UserSaveAnswer[]
}

export type UserSaveAnswer = {
    category: string
    answers: Answer[]
    curr: number
}