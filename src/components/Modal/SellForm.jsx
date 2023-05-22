import { useState } from "react";

import { styles } from "../../helpers/styles";
import { regex } from "../../helpers/regex";

const SellForm = props => {
  const [image, setImage] = useState("");

  const [nameErr, setNameErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [brandErr, setBrandErr] = useState("");

  const [saleInput, setSaleInput] = useState({
    itemName: "",
    itemPrice: "",
    itemSize: "",
    itemBrand: "",
  });

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

    setSaleInput({
      itemName: "",
      itemPrice: "",
      itemSize: "",
      itemBrand: "",
    });

    if (!regex.inputName.test(saleInput.itemName))
      setNameErr("You can use only letters min 3, max 20");

    if (!regex.inputPrice.test(saleInput.itemPrice))
      setPriceErr("You can use only number min 1, max 5");

    if (!regex.inputBrand.test(saleInput.itemBrand))
      setBrandErr("You can use only letters min 3, max 20");

    props.onSaveData(saleInput);
  };

  return (
    <form className="mx-auto w-full" onSubmit={onSubmitHandler}>
      <fieldset>
        <label className="text-left ml-10">
          Add photo of your cloth you want to sale:
        </label>
        <div className="flex">
          <input
            type="file"
            className="border-none w-1/2 h-1/3 mt-10 cursor-pointer ml-20"
            accept="image/*"
            onChange={onImageChange}
            required
          />
          <img
            src={image}
            alt=""
            width={150}
            className={image ? "border mb-2 p-1" : ""}
          />
        </div>
      </fieldset>
      <hr />
      <div className="text-[red] text-center mt-1">{nameErr}</div>
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
          onChange={onSizeChange}
          defaultValue="Choose size"
          required>
          <option value="Choose size" key="1" disabled>
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
      <div className="text-[red] text-center mt-1">{brandErr}</div>
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
      <div className="text-[red] text-center">{priceErr}</div>
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
