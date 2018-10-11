payload = {
    device:"B3FBE5",
    time:"1539251954",
    data:"46a0000000430000000f"

}

let product_configuration_frame = 0x10;
let network_configuration_frame = 0x20;
let keep_aliveframe = 0x30
let replydownlink_frame = 0x31
let data_frame = 0x46
let alarm_frame = 0x47
let periodic_frame_with_1_hour_history = 0x48;
let periodic_frame_with_24_hours_history = 0x48

const buffer = Buffer.from(payload.data, 'hex');
let parsed_buffer = {
    code : buffer[0],
    frame : 0x07&buffer[1] >> 5,
    HW : 0x01 & buffer[1] >> 2,
    low_bat : 0x01 & buffer[1] >> 1,
    config : 0x01 & buffer[1],
    device : payload.device,
    date : new Date(payload.time*1000),
    counter_channel_A : buffer[2] << 24 | buffer[3] << 16 | buffer[4] << 8 | buffer[5],
    counter_channel_B : buffer[6] << 24 | buffer[7] << 16 | buffer[8] << 8 | buffer[9]
}

console.log(`parsed = ${JSON.stringify(parsed_buffer)}`);
