const { randomUUID } = require("crypto");
const fs = require("fs");
const crypto = require("crypto");

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
    attrs.id = this.randomID();
    //{email: 'email@email.com', password: 'askdjfek'}
    //first load up contents of users.json file so we have the most recent data
    const records = await this.getAll();
    //push in the new user
    records.push(attrs);
    //write the updated 'records' array back to this.filename
    //await fs.promises.writeFile(this.filename, JSON.stringify(records));
    await this.writeAll(records);
  }
  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      //make json file easier to read with null and 2 indentation spaces
      JSON.stringify(records, null, 2)
    );
  }
  randomID() {
    return crypto.randomBytes(4).toString("hex");
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }
}

const test = async () => {
  //get accesss to users repository
  const repo = new UsersRepository("users.json");
  //save a new record to it
  //await repo.create({ email: "test@test.com", password: "password" });
  //get all the records we have saved
  //const users = await repo.getAll();
  //and console log the records
  const user = await repo.getOne("95405ea7");
  console.log(user);
};
//
test();
