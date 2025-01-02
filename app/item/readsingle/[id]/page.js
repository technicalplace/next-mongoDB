import Image from "next/image";


const ReadSingle = async (context) => {

  const getSingleItem = async () => {
    const response = await fetch(`http://localhost:3000/api/item/readsingle/${context.params.id}`);
    const jsonData = await response.json();
    return jsonData.singleItem;
  }

  const singleItem = await getSingleItem();

  return (
    <div>
      <div>
        <Image src={singleItem.image} width={750} height={500} alt="商品写真" priority/>
        <h1>{ singleItem.title }</h1>
        <h2>¥{singleItem.price}</h2>
        <hr />
        <p>{ singleItem.description }</p>
      </div>
    </div>
  )
}

export default ReadSingle;