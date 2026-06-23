export type Question = {
    id: number
    category: string
    cn: string
    q: string
    opts: QuestionItem[]
    ans: number
    crit: boolean
    tip: string
    img: string | null
}

export type QuestionItem = {
    n: number
    t: string
}