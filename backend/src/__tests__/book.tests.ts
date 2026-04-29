import { GET_ALL_BOOKS, GET_BOOK, CREATE_BOOK } from "../controllers/book.controller";
import { Request, Response } from "express";
import { BookModel } from "../models/book.model";
import { AuthorModel } from "../models/author.model";

jest.mock("../models/book.model", () => ({
    __esModule: true,

    BookModel: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn()
    }
}));

jest.mock("../models/author.model", () => ({
    __esModule: true,
    default: {}
}));

// Data Template
const MockAuthors = [
    { name: "Author 1" },
    { name: "Author 2" }
]

const MockBooks = [
    { title: "Book 1", first_publish_year: 2000, cover_id: 123, isRecommended: true, authors: [ MockAuthors[0] ] },
    { title: "Book 2", first_publish_year: 2001, cover_id: 456, isRecommended: false, authors: [ MockAuthors[1] ] }
]

describe("Book Controller", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;
    let sendMock: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        jsonMock = jest.fn().mockReturnValue({});
        sendMock = jest.fn().mockReturnValue({});
        statusMock = jest.fn().mockReturnThis();
        
        mockResponse = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        }

        mockRequest = {
            params: {},
            body: {}
        };
    });

    describe("GET_ALL_BOOKS", () => {
        it("Should return all books", async () => {
            (BookModel.findAll as jest.Mock).mockResolvedValue(MockBooks);

            await GET_ALL_BOOKS(mockRequest as Request, mockResponse as Response);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({ body: MockBooks, success: true });
        });
    });

    describe("GET_BOOK", () => {
        it("Backend should return a specific book", async () => {
           (BookModel.findOne as jest.Mock).mockResolvedValue(MockBooks[0]);

            mockRequest.params = { id: "1" };
            await GET_BOOK(mockRequest as Request, mockResponse as Response);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({ body: MockBooks[0], success: true });
        });
    });

    describe("CREATE_BOOK", () => {
        it("Backend should create a new book and then return it", async () => {
            (BookModel.findOne as jest.Mock)
                .mockResolvedValueOnce(null)
                .mockResolvedValueOnce(MockBooks[0]);

            (BookModel.create as jest.Mock).mockResolvedValue({
                id: 1,
                setAuthors: jest.fn()
            })

            mockRequest.body = MockBooks[0];

            await CREATE_BOOK(mockRequest as Request, mockResponse as Response);
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({ body: MockBooks[0], success: true });
        });
    });
});