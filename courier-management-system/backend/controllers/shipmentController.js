const Shipment = require("../models/Shipment");
const generateTrackingId = require("../utils/generateTrackingId");
const PDFDocument = require("pdfkit");

//  BOOK COURIER
exports.bookCourier = async (req, res) => {
  try {
    const {
      customerId,
      pickupAddress,
      deliveryAddress,
      pickupLocation,
      deliveryLocation,
      receiverName,
      receiverPhone,
      weight
    } = req.body;

    if (
      !customerId ||
      !pickupAddress ||
      !deliveryAddress ||
      !receiverName ||
      !receiverPhone
    ) {
      return res.status(400).json("All fields are required");
    }

    if (receiverPhone.length !== 10) {
      return res.status(400).json("Invalid phone number");
    }

    if (weight <= 0) {
      return res.status(400).json("Invalid weight");
    }

    if (!pickupLocation?.lat || !pickupLocation?.lng) {
      return res.status(400).json("Invalid pickup location");
    }

    if (!deliveryLocation?.lat || !deliveryLocation?.lng) {
      return res.status(400).json("Invalid delivery location");
    }

    const shipment = new Shipment({
      customerId,
      pickupAddress,
      deliveryAddress,
      pickupLocation,
      deliveryLocation,
      receiverName,
      receiverPhone,
      weight,
      trackingId: generateTrackingId()
    });

    await shipment.save();

    res.json(shipment);

  } catch (err) {
    res.status(500).json(err.message);
  }
};


// TRACK SHIPMENT
exports.trackShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      trackingId: req.params.id
    });

    // if (!shipment) return res.status(404).json("Not found");
    if (!shipment) {
  return res.status(404).json({ message: "Tracking ID not found" });
}

    res.json(shipment);
  } catch (err) {
    res.status(500).json(err.message);
  }
};


//  STATUS UPDATE (STAFF)
const validFlow = {
  Booked: ["Picked"],
  Picked: ["In Transit"],
  "In Transit": ["Delivered"],
  Delivered: []
};

exports.updateStatus = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

if (!shipment) {
  return res.status(404).json("Shipment not found");
}
    

    const current = shipment.status;
    const next = req.body.status;

    if (!validFlow[current].includes(next)) {
      return res.status(400).json("Invalid status flow");
    }

    shipment.status = next;

    if (next === "Delivered") {
  shipment.deliveryDate = new Date();
  shipment.delivered = true;
}

    await shipment.save();

    res.json(shipment);

  } catch (err) {
    res.status(500).json(err.message);
  }
};


//  HISTORY (CUSTOMER)
exports.getHistory = async (req, res) => {
  try {
    const shipments = await Shipment.find({
      customerId: req.params.id
    });

    res.json(shipments);
  } catch (err) {
    res.status(500).json(err.message);
  }
};




// DOWNLOAD PDF WITH AUTH

exports.downloadPDF = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) return res.status(404).json("Shipment not found");

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt_${shipment.trackingId}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("Courier Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Tracking ID: ${shipment.trackingId}`);
    doc.text(`Status: ${shipment.status}`);
    doc.text(`Receiver: ${shipment.receiverName}`);
    doc.text(`Pickup Address: ${shipment.pickupAddress}`);
    doc.text(`Delivery Address: ${shipment.deliveryAddress}`);
    doc.text(`Weight: ${shipment.weight} kg`);
    doc.text(`Delivery Date: ${shipment.deliveryDate || "Pending"}`);
    doc.end();
  } catch (err) {
    res.status(500).json(err.message);
  }
};



exports.getStaffShipments = async (req, res) => {
  try {
    const staffId = req.user.id;

    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // only today's shipments
    const shipments = await Shipment.find({
      assignedStaff: staffId,
      createdAt: { $gte: today }
    });

    res.json(shipments);

  } catch (err) {
    res.status(500).json(err.message);
  }
};