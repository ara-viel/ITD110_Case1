const express = require('express');
const redis = require('redis');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to Redis
const client = redis.createClient({
  url: 'redis://@127.0.0.1:6379'  // Default Redis connection
});

client.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Redis connection error:', err));

// CRUD Operations

// Route to save resident data
app.post('/residents', async (req, res) => {
  const {id, name, middle, last, birthDate, age, address, gender, civil, employment, contact } = req.body;

  // Validate input fields
  if (!id || !name || !middle || !last || !birthDate || !age || !address || !gender || !civil || !employment || !contact) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Set resident data in Redis (using object syntax for Redis v4 and above)
    const residentData = { name, middle, last, birthDate, age, address, gender, civil, employment, contact };

    // Save resident data in Redis hash
    await client.hSet(`resident:${id}`, 'name', residentData.name);
    await client.hSet(`resident:${id}`, 'middle', residentData.middle);
    await client.hSet(`resident:${id}`, 'last', residentData.last);
    await client.hSet(`resident:${id}`, 'birthDate', residentData.birthDate);
    await client.hSet(`resident:${id}`, 'age', residentData.age);
    await client.hSet(`resident:${id}`, 'address', residentData.address);
    await client.hSet(`resident:${id}`, 'gender', residentData.gender);
    await client.hSet(`resident:${id}`, 'civil', residentData.civil);
    await client.hSet(`resident:${id}`, 'employment', residentData.employment);
    await client.hSet(`resident:${id}`, 'contact', residentData.contact);

    // Respond with success message
    res.status(201).json({ message: 'resident saved successfully' });
  } catch (error) {
    console.error('Error saving resident:', error);
    res.status(500).json({ message: 'Failed to save resident' });
  }
});

// Read (R)
app.get('/residents/:id', async (req, res) => {
  const id = req.params.id;
  const resident = await client.hGetAll(`resident:${id}`);
  if (Object.keys(resident).length === 0) {
    return res.status(404).json({ message: 'resident not found' });
  }
  res.json(resident);
});

// Read all residents
app.get('/residents', async (req, res) => {
  const keys = await client.keys('resident:*');
  const residents = await Promise.all(keys.map(async (key) => {
    return { id: key.split(':')[1], ...(await client.hGetAll(key)) };
  }));
  res.json(residents);
});

// Update (U)
app.put('/residents/:id', async (req, res) => {
  const id = req.params.id;
  const { name, middle, last, birthDate, age, address, gender, civil, employment, contact  } = req.body;

  if (!name && !middle && !last && !birthDate && !age && !address && !gender && !civil && !employment && !contact) {
    return res.status(400).json({ message: 'At least one field is required to update' });
  }

  try {
    const existingResident = await client.hGetAll(`resident:${id}`);
    if (Object.keys(existingResident).length === 0) {
      return res.status(404).json({ message: 'resident not found' });
    }

    // Update resident data in Redis
    if (name) await client.hSet(`resident:${id}`, 'name', name);
    if (middle) await client.hSet(`resident:${id}`, 'middle', middle);
    if (last) await client.hSet(`resident:${id}`, 'last', last);
    if (birthDate) await client.hSet(`resident:${id}`, 'birthDate', birthDate);
    if (age) await client.hSet(`resident:${id}`, 'age', age);
    if (address) await client.hSet(`resident:${id}`, 'address', address);
    if (gender) await client.hSet(`resident:${id}`, 'gender', gender);
    if (civil) await client.hSet(`resident:${id}`, 'civil', civil);
    if (employment) await client.hSet(`resident:${id}`, 'employment', employment);
    if (contact) await client.hSet(`resident:${id}`, 'contact', contact);

    res.status(200).json({ message: 'resident updated successfully' });
  } catch (error) {
    console.error('Error updating resident:', error);
    res.status(500).json({ message: 'Failed to update resident' });
  }
});

// Delete (D)
app.delete('/residents/:id', async (req, res) => {
  const id = req.params.id;
  await client.del(`resident:${id}`);
  res.status(200).json({ message: 'resident deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});