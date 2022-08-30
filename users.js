const fs = require("fs");

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    // Open the file called this.filename
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }
  async create(attrs) {
    //{email: 'email@email.com', password: 'askdjfek'}
    //first load up contents of users.json file so we have the most recent data
    const records = await this.getAll();
    //push in the new user
    records.push(attrs);
    //write the updated 'records' array back to this.filename
    await fs.promises.writeFile(this.filename, JSON.stringify(records));
  }
}

const test = async () => {
  //get accesss to users repository
  const repo = new UsersRepository("users.json");
  //save a new record to it
  await repo.create({ email: "test@test.com", password: "password" });
  //get all the records we have saved
  const users = await repo.getAll();
  //and console log the records
  console.log(users);
};
//
test();
