import { GET_ALL_AUTHORS, GET_AUTHOR, UPDATE_AUTHOR, CREATE_AUTHOR } from "../controllers/author.controller";
import { Request, Response } from "express";
import { AuthorModel } from "../models/author.model";

jest.mock("../models/author.model", () => ({
    __esModule: true,
    AuthorModel: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn()
    }
}));

// Data Template
const MockAuthors = [
    { name: "Author 1" },
    { name: "Author 2" }
]

describe("Author Controller", () => {
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

    describe("GET_ALL_AUTHORS", () => {
        it("Should return all authors", async () => {
            (AuthorModel.findAll as jest.Mock).mockResolvedValue(MockAuthors);

            await GET_ALL_AUTHORS(mockRequest as Request, mockResponse as Response);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({ body: MockAuthors, success: true });
        });
    });

    describe("GET_AUTHOR", () => {
        it("Backend should return a specific author", async () => {
           (AuthorModel.findOne as jest.Mock).mockResolvedValue(MockAuthors[0]);

            mockRequest.params = { id: "1" };
            
            await GET_AUTHOR(mockRequest as Request, mockResponse as Response);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(AuthorModel.findOne).toHaveBeenCalledWith(expect.objectContaining({
                where: { id: "1" }
            }));
            expect(jsonMock).toHaveBeenCalledWith({ body: MockAuthors[0], success: true });
        });
    });

    describe("CREATE_AUTHOR", () => {
        it("Backend should create a new author and then return it", async () => {
            (AuthorModel.findOne as jest.Mock).mockResolvedValueOnce(null);

            (AuthorModel.create as jest.Mock).mockResolvedValue({
                id: 1,
                name: MockAuthors[0].name
            });

            mockRequest.body = MockAuthors[0];

            await CREATE_AUTHOR(mockRequest as Request, mockResponse as Response);
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({ body: { id: 1, name: MockAuthors[0].name }, success: true });
        });
    });

    describe("UPDATE_BOOK", () => {
        it("Backend should update an author", async () => {
            const mockAuthor = {
                id: "1",
                update: jest.fn(),
            };

            const updatedResponse = {
                name: "Author 1"
            };

            (AuthorModel.findOne as jest.Mock)
                .mockResolvedValueOnce(mockAuthor)
                .mockResolvedValueOnce(updatedResponse);

            mockRequest.params = { id: "1" };

            mockRequest.body = {
                name: "New Author"
            };

            await UPDATE_AUTHOR(mockRequest as Request, mockResponse as Response);

            expect(mockAuthor.update).toHaveBeenCalledWith({
                name: "New Author"
            });

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({ body: mockAuthor, success: true });
        });
    })
});