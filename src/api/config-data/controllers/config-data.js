module.exports = {
    async mapData(ctx) {
        // Get data from user_data
        const user_data = await strapi.query('api::user-data.user-data').findMany({});

        // Get data from Phone
        const phone_data = await strapi.query('api::phone.phone').findMany({});

        // Get the config template from config_data
        const config_data = await strapi.query('api::config-data.config-data').findOne();
      
        // แปลงข้อมูลค่าเทมเพลตจากรูปแบบ JSON ให้กลายเป็นอ็อบเจ็กต์
        const configTemplate = JSON.parse(config_data.config_value);

        // สร้างอ็อบเจ็กต์ phoneMap เพื่อเก็บข้อมูลเบอร์โทรศัพท์ตาม user_id
        const phoneMap = {};
        phone_data.forEach(phone => {
            phoneMap[phone.user_id] = phone.phone;
        });

        // Map data using the config template
        const mappedData = user_data.map($item => {
            const mappedItem = {};
            for (const key in configTemplate) {
               //หาก key เป็น user_phone ให้ใช้ข้อมูล phoneMap
                if (key === "user_phone") {
                    mappedItem[key] = phoneMap[$item.id]; // Assuming user_id is stored in item.id
                    
                } else {
                    // ใช้ eval เพื่อประมวลผลสตริงใน configTemplate[key]
                    mappedItem[key] = eval(configTemplate[key]);
                }
            }
            console.log(mappedItem)
            return mappedItem;
        });
        
        return mappedData;
    },
};
