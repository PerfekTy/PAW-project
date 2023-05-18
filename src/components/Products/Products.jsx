import Card from "./Card";

const Products = () => {
  return (
    <div className="grid grid-cols-5 max-w-[1200px] justify-center mx-auto mt-6 gap-4 max-[900px]:max-w-full max-[1100px]:grid-cols-4 max-[900px]:grid-cols-3 max-[660px]:grid-cols-2 max-[660px]:mx-2">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default Products;
