import {getData} from "../utils/fetchingData";
import {useState} from "react";
import Head from "next/head";
import ProductItem from "../components/product/productItem";

const Home = (props) => {
  const [products, setProducts] = useState(props.productProps)

    const handleCheck = () => {

    }
  return(
      <div>
        <Head>
          <title>Home Page</title>
        </Head>

        <div className="products">
          {
            products.length === 0
                ? <h2>No Products</h2>

                : products.map(product => (
                    <ProductItem key={product._id} product={product} handleCheck={handleCheck} />
                ))
          }
        </div>
      </div>
  )
}

export  async function getServerSideProps() {
  const res = await getData('product',)
  //server side rendering
  return {
    props:{
      productProps: res.products,
      result: res.result
    },
  }
}
export default Home;