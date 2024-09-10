import { Router } from "express";
import { ReadFarmController } from "~/controllers/ReadFarmController";
import { WriteFarmController } from "~/controllers/WriteFarmController";

const router = Router();

/**
 * @swagger
 * /api/farms:
 *   get:
 *     summary: Get a list of all farms
 *     description: Retrieve a list of all farms from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of all farms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   document:
 *                     type: string
 *                     example: "123"
 *                   producer_name:
 *                     type: string
 *                     example: "João"
 *                   farm_name:
 *                     type: string
 *                     example: "Fazenda A"
 *                   city:
 *                     type: string
 *                     example: "Cidade A"
 *                   state:
 *                     type: string
 *                     example: "Estado A"
 *                   total_area:
 *                     type: number
 *                     example: 100
 *                   cultivable_area:
 *                     type: number
 *                     example: 80
 *                   vegetation_area:
 *                     type: number
 *                     example: 20
 *                   crops:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Soja", "Milho"]
 */
router.get("/farms", new ReadFarmController().getFarms);

/**
 * @swagger
 * /api/farms/{id}:
 *   get:
 *     summary: Get a farm by ID
 *     description: Retrieve a farm by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the farm to retrieve
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successful response with the farm.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 document:
 *                   type: string
 *                   example: "123"
 *                 producer_name:
 *                   type: string
 *                   example: "João"
 *                 farm_name:
 *                   type: string
 *                   example: "Fazenda A"
 *                 city:
 *                   type: string
 *                   example: "Cidade A"
 *                 state:
 *                   type: string
 *                   example: "Estado A"
 *                 total_area:
 *                   type: number
 *                   example: 100
 *                 cultivable_area:
 *                   type: number
 *                   example: 80
 *                 vegetation_area:
 *                   type: number
 *                   example: 20
 *                 crops:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Soja", "Milho"]
 *       404:
 *         description: Farm not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/farms/:id", new ReadFarmController().getFarmById);

/**
 * @swagger
 * /api/farms:
 *   post:
 *     summary: Create a new farm
 *     description: Add a new farm to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 example: "123"
 *               producer_name:
 *                 type: string
 *                 example: "João"
 *               farm_name:
 *                 type: string
 *                 example: "Fazenda A"
 *               city:
 *                 type: string
 *                 example: "Cidade A"
 *               state:
 *                 type: string
 *                 example: "Estado A"
 *               total_area:
 *                 type: number
 *                 example: 100
 *               cultivable_area:
 *                 type: number
 *                 example: 80
 *               vegetation_area:
 *                 type: number
 *                 example: 20
 *               crops:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Soja", "Milho"]
 *     responses:
 *       201:
 *         description: Farm created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 document:
 *                   type: string
 *                   example: "123"
 *                 producer_name:
 *                   type: string
 *                   example: "João"
 *                 farm_name:
 *                   type: string
 *                   example: "Fazenda A"
 *                 city:
 *                   type: string
 *                   example: "Cidade A"
 *                 state:
 *                   type: string
 *                   example: "Estado A"
 *                 total_area:
 *                   type: number
 *                   example: 100
 *                 cultivable_area:
 *                   type: number
 *                   example: 80
 *                 vegetation_area:
 *                   type: number
 *                   example: 20
 *                 crops:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Soja", "Milho"]
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.post("/farms", new WriteFarmController().createFarm);

/**
 * @swagger
 * /api/farms/{id}:
 *   put:
 *     summary: Update a farm by ID
 *     description: Update the details of an existing farm by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the farm to update
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 example: "123"
 *               producer_name:
 *                 type: string
 *                 example: "João"
 *               farm_name:
 *                 type: string
 *                 example: "Fazenda A"
 *               city:
 *                 type: string
 *                 example: "Cidade A"
 *               state:
 *                 type: string
 *                 example: "Estado A"
 *               total_area:
 *                 type: number
 *                 example: 100
 *               cultivable_area:
 *                 type: number
 *                 example: 80
 *               vegetation_area:
 *                 type: number
 *                 example: 20
 *               crops:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Soja", "Milho"]
 *     responses:
 *       200:
 *         description: Farm updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 document:
 *                   type: string
 *                   example: "123"
 *                 producer_name:
 *                   type: string
 *                   example: "João"
 *                 farm_name:
 *                   type: string
 *                   example: "Fazenda A"
 *                 city:
 *                   type: string
 *                   example: "Cidade A"
 *                 state:
 *                   type: string
 *                   example: "Estado A"
 *                 total_area:
 *                   type: number
 *                   example: 100
 *                 cultivable_area:
 *                   type: number
 *                   example: 80
 *                 vegetation_area:
 *                   type: number
 *                   example: 20
 *                 crops:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Soja", "Milho"]
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Farm not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/farms/:id", new WriteFarmController().updateFarm);

/**
 * @swagger
 * /api/farms/{id}:
 *   delete:
 *     summary: Delete a farm by ID
 *     description: Remove a farm from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the farm to delete
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Farm deleted successfully.
 *       404:
 *         description: Farm not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/farms/:id", new WriteFarmController().deleteFarm);

/**
 * @swagger
 * /api/dashboards:
 *   get:
 *     summary: Get farm dashboards
 *     description: Retrieve dashboards for farms.
 *     responses:
 *       200:
 *         description: Successful response with farm dashboards.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalOfFarms:
 *                   type: integer
 *                   example: 54
 *                 totalArea:
 *                   type: integer
 *                   example: 7938
 *                 percentageByState:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       state:
 *                         type: string
 *                         example: "Estado A"
 *                       percentage:
 *                         type: number
 *                         format: float
 *                         example: 44.44
 *                 percentageByCropType:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       crop:
 *                         type: string
 *                         example: "Soja"
 *                       percentage:
 *                         type: number
 *                         format: float
 *                         example: 44.44
 *                 percentageByLandUse:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       land_type:
 *                         type: string
 *                         example: "Cultivable Area"
 *                       percentage:
 *                         type: number
 *                         format: float
 *                         example: 70.11
 *       500:
 *         description: Internal server error.
 */
router.get("/dashboards", new ReadFarmController().getFarmDashboards);

export default router;
