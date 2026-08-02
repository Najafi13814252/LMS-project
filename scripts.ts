import { prisma } from "./lib/prisma";

async function main() {
    await prisma.category.createMany({
        data: [
            { name: "علوم کامپیوتر" },
            { name: "موسیقی" },
            { name: "ورزش و تناسب‌اندام" },
            { name: "عکاسی" },
            { name: "حسابداری" },
            { name: "فیلمبرداری" }
        ]
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });