const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default class User {
  static async getUserById(id) {
    await sleep(1000 * Math.random());
    return { id, name: "Joao" };
  }
}
