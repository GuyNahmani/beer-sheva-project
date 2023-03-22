import Axios from 'axios';


//  export const apiController2 = () => {
//     let array = Axios.get(`http://localhost:5000/api/allshelters/`)
//     .then(res => {
//       const allShelters = res;
//       array = []
//       for (let index = 0; index < allShelters.data.length; index++) {
//         array.push([(Number(allShelters.data[index].lon)), (Number(allShelters.data[index].lat))])
//       }
//       return array
//     })
//   return  array
// }

export const apiController = async () =>{
     const response = await Axios.get(`http://localhost:5000/api/allshelters/`)
    const shelters = []
     for (let index = 0; index < response.data.length; index++) {
        shelters.push([(Number(response.data[index].lon)), (Number(response.data[index].lat))])
      }

return shelters
}