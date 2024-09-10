export async function getData(){
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert').then(res => res.json());
    return res
}