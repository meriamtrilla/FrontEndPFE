export interface Question{
    id: string;
    name : string;
    correct_response: string;
    response_type: string;
    responses : string[];
    test_id? : Number;
    interview_id? : Number;
    photo : string;
}