const express = require('express');
const { db } = require('../../firebase');
const { createFoodValidation } = require('../validator/foodsValidate');

const router = express.Router();
const collectionRef = db.collection('foods');

router.get('/', async (req, res) => {
  try {
    const snapshot = await collectionRef.get();
    const foods = snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }));
    res.json(foods);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  const { error } = createFoodValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const data = {
    name: req.body.name,
    balance: 5,
    price: req.body.price
  };

  try {
    const saveFood = await collectionRef.add(data);
    res.json(saveFood.path);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get('/:foodId', async (req, res) => {
  try {
    const food = await collectionRef.doc(req.params.foodId).get();
    const data = {
      id: food.id,
      ...food.data()
    };
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch('/:foodId', async (req, res) => {
  try {
    const updateData = { ...req.body };
    const updatedFood = await collectionRef
      .doc(req.params.foodId)
      .update(updateData);
    console.log(updatedFood);
    res.json(updatedFood);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete('/:foodId', async (req, res) => {
  try {
    const removedFood = await collectionRef.doc(req.params.foodId).delete();
    res.json(removedFood);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
