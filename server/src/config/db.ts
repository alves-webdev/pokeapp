import { myDataSource } from "../app-data-source"

export const ConnectDB = async () => {

    myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

}