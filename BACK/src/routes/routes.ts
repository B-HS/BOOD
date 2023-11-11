import { PrismaClient } from "@prisma/client";
import { Express, Request, Response } from "express";

export interface Food {
  am: string;
  pm: string;
  date: string;
}

const initRoutes = (app: Express) => {
  const prisma = new PrismaClient();
  const FRONT_URL = process.env.FRONT_URL;
  const FALLBACK_FRONT_URL = "https://github.com/B-HS/BOOD";
  app.get("/", (req: Request, res: Response) => {
    res.redirect(FALLBACK_FRONT_URL || FRONT_URL);
  });

  app.post("/addfoods", async (req: Request, res: Response) => {
    const data: Partial<Food>[] = req.body.foods;
    await prisma.food.deleteMany({});
    const result = data.map(async (ele) => {
      const { am, pm, date } = ele;
      const result = await prisma.food.create({
        data: {
          am: am || "EMPTY",
          pm: pm || "EMPTY",
          date: new Date(date as string) || new Date("2023-01-01"),
        },
      });
      return result.fid;
    });
    return res.status(200).json({ result: "success" });
  });

  app.post("/foodlist", async (_, res: Response) => {
    return res.json(await prisma.food.findMany({ orderBy: { date: "asc" } }));
  });

  app.post("/pw", async (req: Request, res: Response) => {
    const { pw } = req.body;
    console.log(pw);
    console.log(process.env.PW);
    if (pw === process.env.PW) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  });

  app.post("/today", async (_, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    today.setHours(23, 59, 59, 999);
    const end = new Date(today);

    return res.json(
      await prisma.food.findFirst({ where: { date: { gte: start, lte: end } } })
    );
  });
};

export { initRoutes };
