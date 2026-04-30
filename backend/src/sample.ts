import { sequelize } from "./database";
import UserModel from "./models/user.model";
import AuthorModel from "./models/author.model";
import BookModel from "./models/book.model";
import RoleModel from "./models/role.model";
import PermissionModel from "./models/permission.model";
import BorrowModel from "./models/booking.model";
import InventoryModel from "./models/inventory.model";
import { InventoryStatus, BorrowStatus } from "@bookwebapp/types";

import { hashPassword } from "./utils/password";

export async function seedSampleData() {
    await sequelize.sync({ force: true });

    const sampleRoles = await RoleModel.bulkCreate([
        { name: "Admin" },
        { name: "User" },
        { name: "Guest" }
    ]);

    const samplePermissions = await PermissionModel.bulkCreate([
        { permission_string: "READ_BOOKS" },
        { permission_string: "WRITE_BOOKS" },
        { permission_string: "DELETE_BOOKS" },
        { permission_string: "READ_USERS" },
        { permission_string: "WRITE_USERS" },
        { permission_string: "DELETE_USERS" },
        { permission_string: "ADMINISTRATOR" },
    ]);

    await sampleRoles[0].setPermissions([samplePermissions[6]]);
    await sampleRoles[1].setPermissions([samplePermissions[0], samplePermissions[3]]);
    //await sampleRoles[2].setPermissions([samplePermissions[0]]);

    const sampleUsers = await UserModel.bulkCreate([
        { username: "Admin", password: "debug12345", email: "sam.kynaston@kynno.co.uk" },
        { username: "User", password: "debug12345", email: "sam.kynaston2@kynno.co.uk", must_reset_password: true }
    ], { individualHooks: true });

    await sampleUsers[0].setRoles([sampleRoles[0]]);
    await sampleUsers[1].setRoles([sampleRoles[1]]);

    const sampleAuthors = await AuthorModel.bulkCreate([
        { name: "J.K. Rowling" },
        { name: "George Orwell" },
        { name: "J.R.R. Tolkien" },
        { name: "Agatha Christie" },
        { name: "Frank Herbert" },
        { name: "Isaac Asimov" },
        { name: "Arthur C. Clarke" },
        { name: "Mary Shelley" },
        { name: "F. Scott Fitzgerald" },
        { name: "Leo Tolstoy" }
    ]);

    const sampleBooks = await BookModel.bulkCreate([
        { title: "Harry Potter and the Sorcerer's Stone", first_publish_year: 1997, cover_id: 101, is_recommended: true },
        { title: "Harry Potter and the Prisoner of Azkaban", first_publish_year: 1999, cover_id: 101, is_recommended: true },

        { title: "1984", first_publish_year: 1949, cover_id: 101, is_recommended: true },
        { title: "Animal Farm", first_publish_year: 1945, cover_id: 101, is_recommended: false },

        { title: "The Hobbit", first_publish_year: 1937, cover_id: 101, is_recommended: true },
        { title: "The Lord of the Rings", first_publish_year: 1954, cover_id: 101, is_recommended: true },

        { title: "Murder on the Orient Express", first_publish_year: 1934, cover_id: 101, is_recommended: false },
        { title: "And Then There Were None", first_publish_year: 1939, cover_id: 101, is_recommended: true },

        { title: "Dune", first_publish_year: 1965, cover_id: 101, is_recommended: true },
        { title: "Dune Messiah", first_publish_year: 1969, cover_id: 101, is_recommended: false },

        { title: "Foundation", first_publish_year: 1951, cover_id: 101, is_recommended: true },
        { title: "I, Robot", first_publish_year: 1950, cover_id: 101, is_recommended: false },

        { title: "2001: A Space Odyssey", first_publish_year: 1968, cover_id: 101, is_recommended: true },

        { title: "Frankenstein", first_publish_year: 1818, cover_id: 101, is_recommended: true },

        { title: "The Great Gatsby", first_publish_year: 1925, cover_id: 101, is_recommended: false },

        { title: "War and Peace", first_publish_year: 1869, cover_id: 101, is_recommended: false }
    ]);

    await sampleUsers[0].setFavourites([sampleBooks[0], sampleBooks[1], sampleBooks[3]])

    await sampleBooks[0].setAuthors([sampleAuthors[0]]);
    await sampleBooks[1].setAuthors([sampleAuthors[0]]);

    await sampleBooks[2].setAuthors([sampleAuthors[1]]);
    await sampleBooks[3].setAuthors([sampleAuthors[1]]);

    await sampleBooks[4].setAuthors([sampleAuthors[2]]);
    await sampleBooks[5].setAuthors([sampleAuthors[2]]);

    await sampleBooks[6].setAuthors([sampleAuthors[3]]);
    await sampleBooks[7].setAuthors([sampleAuthors[3]]);

    await sampleBooks[8].setAuthors([sampleAuthors[4]]);
    await sampleBooks[9].setAuthors([sampleAuthors[4]]);

    await sampleBooks[10].setAuthors([sampleAuthors[5]]);
    await sampleBooks[11].setAuthors([sampleAuthors[5]]);

    await sampleBooks[12].setAuthors([sampleAuthors[6]]);
    await sampleBooks[13].setAuthors([sampleAuthors[7]]);
    await sampleBooks[14].setAuthors([sampleAuthors[8]]);
    await sampleBooks[15].setAuthors([sampleAuthors[9]]);

    await InventoryModel.bulkCreate([
        { bookId: sampleBooks[0].id, location: "Floor 2, Shelf A", status: InventoryStatus.AVAILABLE },
        { bookId: sampleBooks[0].id, location: "Floor 2, Shelf A", status: InventoryStatus.AVAILABLE },
        { bookId: sampleBooks[0].id, location: "Floor 2, Shelf B", status: InventoryStatus.AVAILABLE },
        { bookId: sampleBooks[0].id, location: "Floor 2, Shelf B", status: InventoryStatus.AVAILABLE },
        { bookId: sampleBooks[0].id, location: "Floor 2, Shelf C", status: InventoryStatus.AVAILABLE },
        { bookId: sampleBooks[1].id, location: "Floor 2, Shelf A", status: InventoryStatus.AVAILABLE },
        { bookId: sampleBooks[1].id, location: "Floor 2, Shelf B", status: InventoryStatus.AVAILABLE },
        { bookId: sampleBooks[2].id, location: "Floor 1, Shelf D", status: InventoryStatus.AVAILABLE },
        { bookId: sampleBooks[4].id, location: "Floor 3, Shelf A", status: InventoryStatus.AVAILABLE },
    ]); 
}