import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY: string | undefined = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
    throw new Error('API_KEY not found in environment variables.');
}
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});

const description: string = "assume that the review is about a software application and classify the review based on multiple labels(categorise them into multiple classes when necessary): 'F':'Feature Request','AU':'Authentication','FI':'Filtering', 'A':'Availability', 'L':'Legal', 'LF':'Look-and-Feel', 'MN':'Maintainability', 'O':'Operability', 'PE':'Performance', 'SC':'Scalability', 'SE':'Security', 'US':'Usability', 'BR':'Bug Report', 'PO':'Portability', 'IR':'Irrelevant'. Positive reviews/compliments or sensitive content or inappropriate context or irrelevant comments or statements that are incomprehensible or that does not specify any issue/requirement are considered as IR, and cannot be classified under any other label. Issues associated with bugs/crashes/errors in the application should be classified as BR. Only issues relating to login/authentication errors, authorization, OTP, or sign-in should fall under AU. Any issues pertaining to functionality such as searching, filtering, sorting, arranging, organizing, or grouping can fall under FI. Issues related to the unavailability of the application in certain countries or on certain devices may fall under A. Legal issues, subscription matters, in-app purchases, or terms and conditions concerns can come under L. Any aspect not classified as a functional requirement and related to the visual and feel of the app may come under LF. Issues concerning customer service, inadequate support, inconsistent updates, or limited functionality will be classified under MN. Any problems related to abnormal functioning of the app or issues in opening, updating, or working of the app may fall into O. Issues related to limited quantity, version scalability, or expansion of a particular feature may come under SC. Any concerns regarding privacy and security of the user will come under SE. Personal concerns or issues in using the application may fall under US. Issues pertaining to the compatibility of the application fall under PO.";

async function Classify(review: string): Promise<string[]> {
    const prompt: string = `'${review}', ${description}`;
    try {
        const response = await model.generateContent(prompt);
        console.log("this is the console log:",response.response.text().split('\n')[0].split(","));
        return response.response.text().split('\n')[0].split(",");
    } catch (e) {
        return ["IR"];
    }
}

export default Classify;