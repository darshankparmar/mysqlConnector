import { response } from "express";
import { generateV4uuid } from "../common/common.js";
import { executeQuery } from "../common/common.js";
import responses from "../common/response.js";
export async function createExpense(data) {
  try {
    const query = `INSERT INTO expense (id, amount, name, paidBy, owedBy, createdBy) VALUES (?, ?, ?, ?, ?, ?);`;
    console.log(data);
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
