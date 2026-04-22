import { sequelize } from "./database";
import UserModel from "./models/user.model";
import AuthorModel from "./models/author.model";
import BookModel from "./models/book.model";
import RoleModel from "./models/role.model";
import PermissionModel from "./models/permission.model";

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
        { username: "Admin", password: await hashPassword("debug"), email: "sam.kynaston@kynno.co.uk" },
        { username: "User", password: await hashPassword("debug"), email: "sam.kynaston2@kynno.co.uk" }
    ]);

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
        { title: "Harry Potter and the Sorcerer's Stone", first_publish_year: 1997, cover_id: 101, isRecommended: true },
        { title: "Harry Potter and the Prisoner of Azkaban", first_publish_year: 1999, cover_id: 111, isRecommended: true },

        { title: "1984", first_publish_year: 1949, cover_id: 102, isRecommended: true },
        { title: "Animal Farm", first_publish_year: 1945, cover_id: 112, isRecommended: false },

        { title: "The Hobbit", first_publish_year: 1937, cover_id: 103, isRecommended: true },
        { title: "The Lord of the Rings", first_publish_year: 1954, cover_id: 113, isRecommended: true },

        { title: "Murder on the Orient Express", first_publish_year: 1934, cover_id: 104, isRecommended: false },
        { title: "And Then There Were None", first_publish_year: 1939, cover_id: 114, isRecommended: true },

        { title: "Dune", first_publish_year: 1965, cover_id: 105, isRecommended: true },
        { title: "Dune Messiah", first_publish_year: 1969, cover_id: 115, isRecommended: false },

        { title: "Foundation", first_publish_year: 1951, cover_id: 106, isRecommended: true },
        { title: "I, Robot", first_publish_year: 1950, cover_id: 116, isRecommended: false },

        { title: "2001: A Space Odyssey", first_publish_year: 1968, cover_id: 107, isRecommended: true },

        { title: "Frankenstein", first_publish_year: 1818, cover_id: 108, isRecommended: true },

        { title: "The Great Gatsby", first_publish_year: 1925, cover_id: 109, isRecommended: false },

        { title: "War and Peace", first_publish_year: 1869, cover_id: 110, isRecommended: false }
    ]);

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
}