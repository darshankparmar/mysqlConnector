import { generateV4uuid } from "../common/common.js";
import { executeQuery } from "../common/common.js";
import responses from "../common/response.js";
export async function addExpense(data) {
  try {
    const query = `INSERT INTO expense (id, amount, name, paidBy, owedBy, createdBy) VALUES (?, ?, ?, ?, ?, ?);`;
    const result = await executeQuery(query, [
      generateV4uuid(),
      data.amount,
      data.name,
      data.paidBy,
      data.owedBy,
      data.createdBy,
    ]);
    if (result) {
      return responses.success;
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
}

export async function addSplitExpense(data) {
  try {
    const query = `INSERT INTO splitexpense (id, paidBy, owedBy,  amount, createdBy) VALUES (?, ?, ?, ?, ?);`;
    const result = await executeQuery(query, [
      generateV4uuid(),
      data.paidBy,
      data.owedBy,
      data.amount,
      data.createdBy,
    ]);
    if (result) {
        console.log("added...");
      return result;
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    console.log("eeeee");
    return responses.errorOccured(400, error);
  }
}
