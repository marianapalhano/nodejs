import { hash } from "bcrypt";
import { createConnection } from "database";
import { v4 as uuidV4 } from "uuid";

async function create(): Promise<void> {
    const connection = await createConnection();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license ) 
      values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXXX')
    `
    );

    await connection.close();
}

void create().then(() => {
    console.log("Admin user created");
});
