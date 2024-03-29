import axios from "axios";
const baseUrl = "https://data.gov.il/api/3/action/datastore_search?resource_id=e191d913-11e4-4d87-a4b2-91587aab6611";

const getInfo = async (req, res) => {
    try {
        const response = await axios.get(baseUrl);
        const RawData = response.data;
        const records = RawData.result.records;
       
     res.send(records);

    } catch (error) {
        res.status(500).json({
            message: "Server error. Please try again later.",
        })
    }
}

export { getInfo }
