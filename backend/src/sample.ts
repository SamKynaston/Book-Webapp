import { sequelize } from "./database";
import UserModel from "./models/user.model";
import AuthorModel from "./models/author.model";
import BookModel from "./models/book.model";

export async function seedSampleData() {
    await UserModel.sync({ force: true });
    await AuthorModel.sync({ force: true });
    await BookModel.sync({ force: true });
    await sequelize.model("AuthorBook").sync({ force: true });
    
    const sampleUsers = await UserModel.bulkCreate([
        { username: "Admin", password: "debug", email: "sam.kynaston@kynno.co.uk" }
    ])

    const sampleAuthors = await AuthorModel.bulkCreate([
      { name: "J.K. Rowling" },
      { name: "George Orwell" },
      { name: "J.R.R. Tolkien" },
      { name: "Agatha Christie" },
    ]);

    const sampleBooks = await BookModel.bulkCreate([
      { title: "Harry Potter and the Sorcerer's Stone", first_publish_year: 1997, cover_id: 101, isRecommended: true },
      { title: "1984", first_publish_year: 1949, cover_id: 102, isRecommended: true },
      { title: "The Hobbit", first_publish_year: 1937, cover_id: 103, isRecommended: false },
      { title: "Murder on the Orient Express", first_publish_year: 1934, cover_id: 104, isRecommended: false },
    ])

    await sampleBooks[0].setAuthors([sampleAuthors[0]])
    await sampleBooks[1].setAuthors([sampleAuthors[1]])
    await sampleBooks[2].setAuthors([sampleAuthors[2]])
    await sampleBooks[3].setAuthors([sampleAuthors[3]])
}