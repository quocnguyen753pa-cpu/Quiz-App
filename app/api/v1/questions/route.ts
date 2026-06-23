import { NextResponse, NextRequest } from "next/server";
import { Question } from "@/constants/question";
import questionsJson from "@/data/questions.json";
import { Category } from "@/constants";
import { randomSample } from "@/lib/utils";

const questions = questionsJson as Question[];

export async function GET(request: NextRequest) {
    const category = request.nextUrl.searchParams.get('category') ?? Category.all_gplx_600;
    let result = questions;

    if (category === Category.crit_gplx_600) {
        result = questions.filter(q => q.crit);
    }

    if (category === Category.test) {
        const critQuestions = randomSample(questions.filter(q => q.crit), 1);
        const noCritQuestions = randomSample(questions.filter(q => !q.crit), 29);
        result = randomSample([...noCritQuestions, ...critQuestions], 30);
    }

    return NextResponse.json(result);
}