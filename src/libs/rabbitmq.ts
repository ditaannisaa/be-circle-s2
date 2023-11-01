// import * as amqp from 'amqplib'

// export default new class MessageQueue {
//     async MessageSend(queueName: string, payload: any) :
//     Promise<Boolean> {
//         try {
//             const connection = await amqp.connect("amqp://localhost:15672/")
//             const channel = await connection.createChannel()

//             await channel.assaerQueue(queueName)
//             channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)))

//             await channel.close()
//             await connection.close()

//             return null
//     } catch (err) {
//         return err
//     }
//     }

// }
