import { Request, Response } from "express";

let timer1: NodeJS.Timeout | null = null;
let timer2: NodeJS.Timeout | null = null;
const jsonData = require("../../data.json");

const getByEmail = (req: Request, res: Response) => {
  const email = req.params.email;

  // Отменить предыдущий запрос, если он существует
  if (timer1) {
    clearTimeout(timer1);
  }
  console.log(timer1);
  // Запустить новый таймер задержки
  timer1 = setTimeout(() => {
    const results = jsonData.filter((item: any) => item.email === email);

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  }, 5000); // Задержка в 5 секунд
};
const getByEmailAndNumber = (req: Request, res: Response) => {
  const { email, number } = req.query;

  // Отменить предыдущий запрос, если он существует
  if (timer2) {
    clearTimeout(timer2);
  }

  // Запустить новый таймер задержки
  timer2 = setTimeout(() => {
    const results = jsonData.filter(
      (item: any) => item.email === email && item.number === number
    );

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  }, 5000); // Задержка в 5 секунд
};
module.exports = {
  getByEmail,
  getByEmailAndNumber,
};
