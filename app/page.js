import Image from "next/image";
import Link from "next/link";

const ReadAllItems = async () => {
  /** サーバーからアイテム全取得 */
  const getAllItems = async () => {
    const response = await fetch("http://localhost:3000/api/item/readall");
    const jsonData = await response.json();
    return jsonData.allItems;
  }

  const allItems = await getAllItems();
  console.log(allItems);

  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <ul>
        {allItems.map((item, index) => (
          <li key={item._id}>
            <Link href={`/item/readsingle/${item._id}`}>
              <Image width={750} height={500} src={item.image} alt="商品写真" />
              <h2>{ item.price }</h2>
              <h3>{ item.title }</h3>
              <p>{ item.description.substring(0, 80) }...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadAllItems;
