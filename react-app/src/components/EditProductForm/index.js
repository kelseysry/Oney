import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams, useHistory, NavLink } from "react-router-dom";
import { editAProduct, getOneProduct } from "../../store/product";
import './EditProductForm.css'

const EditProductForm = () =>{
  const categoryTree = useSelector(state=>state.category.tree)

    let categoryList = []
    function generateAllCategories(category, path){
        if (!category) return
        let pathCopy = path.slice()
        if (category.id !== "root" && category.id !== null) {
            pathCopy.push(category.short_name)
            categoryList.push(
                {
                    "id": category.id,
                    "display_name": pathCopy.join('-')
                }
            )
        }
        let children = category.children
        children.forEach(childCategory => {
            generateAllCategories(childCategory,pathCopy)
        });
    }

    generateAllCategories(categoryTree,[])

  const params = useParams();
  const { productId } = params;
  const product = useSelector((state) => state?.product[productId] ? state?.product[productId] : "")

  const [title, setTitle] = useState(product?.title ? product?.title : "");
  const [description, setDescription] = useState(product.description ? product.description : "");
  const [price, setPrice] = useState(product.price ? product.price : "")
  const [category, setCategory] = useState(product.category_id ? product.category_id : "")
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user)

  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(()=>{
    dispatch(getOneProduct(productId))
  }, [dispatch, productId])


  useEffect(() => {
    if (product) {
      setTitle(product.title)
      setDescription(product.description)
      setPrice(product.price)
      setCategory(product.category_id)
    }
  }, [dispatch, product])

  useEffect(() => {
    const validationErrs = [];
    if(title.length < 3 || !title) validationErrs.push("A title is required")
    if(!description) validationErrs.push("A description is required")
    if(price > 1000 || price < 1) validationErrs.push("Price must be at least $1")
    if(!category) validationErrs.push("Please select a category!")

    setErrors(validationErrs)
  },[title, description, price, category])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      price,
      category,
    }

    let editedProduct = await dispatch((editAProduct(payload, productId)));
    if (editedProduct) {
      history.push(`/products/${editedProduct.id}`);
    }

    if (!product) return null;

  }

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return (
    <div>
      <div className='editBackBtnDiv'>
        <NavLink to={`/products/${productId}`}
          className='editBackBtn'
        >
          <i class="fas fa-arrow-alt-circle-left"></i>
          &nbsp;Back
          </NavLink>
      </div>
      <div className='EditProductDivBox'>
        <div className='innerFormContent'>
          <div className="Edit-Title">Edit your product details</div>
          <div className='editProductDiv editProductFormContainer'>
            <form onSubmit={handleSubmit} className='editProduct' >
              <div className="productErrors">
                <ul>
                  {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
              </div>
              <div>
                <label htmlFor='Title'>Product Title</label>
                  <input
                  onChange={(e)=>setTitle(e.target.value)}
                  value={title}
                  type="text"
                  required
                  />
              </div>
              <div>
                <label htmlFor='Description'>Product Description</label>
                  <textarea
                  onChange={(e)=>setDescription(e.target.value)}
                  value={description}
                  type="text"
                  required
                  className='descriptionArea'
                  />
              </div>
              <div>
                <label>Category</label>
                  <select
                    className="category-select"
                    onChange={(e)=>setCategory(e.target.value)}
                    value={category}
                    >
                    {(categoryList.map(category => {
                      return (
                        <option key={"newProductFormCategory-"+category?.id} value={category.id}>{category.display_name}</option>
                      )
                    }))}
                  </select>
              </div>
              <div>
                <label htmlFor='Price'>Price Per Product</label>
                  <input
                  onChange={(e)=>setPrice(e.target.value)}
                  value={price}
                  required
                  type="number"
                  min = "1"
                  max = "1000"
                  step = "0.01"
                  />
              </div>
              <div className='bottomButtons'>
                <button className='submitBtn' type='submit'>
                  Submit
                </button>
                <NavLink to={`/products/${productId}`} className='editProdCancel'>Cancel</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )

}

export default EditProductForm;
