const fs = require("fs");

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename");
    }

    this.filename = filename;
    //use access function to see if file exists (from node docs)
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  async getAll() {
    //open the file called this.filename
    const contents =
      (await fs.promises) / fs.readFile(this.filename, { encoding: "utf-8" });

    console.log(contents);
    //read its contents

    //parse the contents

    //return the parsed data
  }
}
const test = async () => {
  const repo = new UsersRepository("users.json");
  await repo.getAll();
};

test();
