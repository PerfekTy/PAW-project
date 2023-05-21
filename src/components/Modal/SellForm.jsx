import { useState } from "react";
import { styles } from "../../helpers/styles";

const SellForm = () => {
  const [saleInput, setSaleInput] = useState({
    itemName: "",
    itemPrice: "",
    itemSize: "",
    itemBrand: "",
  });

  const [image, setImage] = useState("");

  const onImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onNameChange = e => {
    setSaleInput({ ...saleInput, itemName: e.target.value });
  };

  const onPriceChange = e => {
    setSaleInput({ ...saleInput, itemPrice: e.target.value });
  };

  const onSizeChange = e => {
    setSaleInput({ ...saleInput, itemSize: e.target.value });
  };

  const onBrandChange = e => {
    setSaleInput({ ...saleInput, itemBrand: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    const data = saleInput;
  };

  return (
    <form className="m-3" onSubmit={onSubmitHandler}>
      <fieldset className="text-center">
        <label>Add photo of your cloth you want to sale:</label>
        <input
          type="file"
          className="border border-[#ccc] cursor-pointer w-[80%]"
          accept="image/*"
          onChange={onImageChange}
          required
        />
      </fieldset>
      <hr />
      <fieldset className={styles.CENTER}>
        <label>1. </label>
        <input
          type="text"
          className={styles.INPUT_MODAL}
          placeholder="Name of the cloth..."
          value={saleInput.itemName}
          onChange={onNameChange}
          required
        />
      </fieldset>
      <fieldset className="flex items-center justify-center">
        <label>
          <span className="pr-2">2. </span>
        </label>
        <select
          className="w-1/3"
          value={saleInput.itemSize}
          onChange={onSizeChange}
          required>
          <option value="" disabled selected>
            Choose size
          </option>
          <option value="XXS" key="2">
            XXS - 32
          </option>
          <option value="XS" key="3">
            XS - 34
          </option>
          <option value="S" key="4">
            S - 36
          </option>
          <option value="M" key="5">
            M - 38
          </option>
          <option value="L" key="6">
            L - 40
          </option>
          <option value="XL" key="7">
            XL - 42
          </option>
          <option value="XXL" key="8">
            XXL - 44
          </option>
        </select>
      </fieldset>
      <fieldset className={styles.CENTER}>
        <label>3. </label>
        <input
          type="text"
          className={styles.INPUT_MODAL}
          value={saleInput.itemBrand}
          onChange={onBrandChange}
          placeholder="What brand is your cloth? If none leave it blank..."
        />
      </fieldset>
      <fieldset className={styles.CENTER}>
        <label className="-mt-3">4. </label>
        <input
          type="text"
          className={`${styles.INPUT_MODAL} -mt-[1px]`}
          value={saleInput.itemPrice}
          onChange={onPriceChange}
          placeholder="Your price..."
          required
        />
      </fieldset>
      <fieldset className={styles.CENTER}>
        <input
          type="submit"
          className={`${styles.INPUT_MODAL} cursor-pointer mt-10 hover:bg-[#174ea6] hover:text-white font-bold tracking-wider transition-all duration-200`}
          value="Add cloth to sale"
        />
      </fieldset>
    </form>
  );
};

export default SellForm;
