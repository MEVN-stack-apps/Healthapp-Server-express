const { loadToken, loadData } = require("../../services/axios/apimedic");

const getToken = async (req, res) => {
  // get token
  //  TODO: add created at time while creating token to check validity,
  //        if not valid, call for new token
  const tokenObject = await loadToken();
  return tokenObject.Token;
};

const getSymptoms = async (req, res) => {
  const token = await getToken();
  const params = { name: "symptoms" };
  const symptomsDataset = await loadData(params, token);

  if (!symptomsDataset)
    res
      .status(500)
      .json({ message: "Error on getting symptoms from apimedic" });
  return res.json({
    status: symptomsDataset.status,
    symptomsDataset: symptomsDataset.data,
  });
};

const getIssues = async (req, res) => {
  const token = await getToken();
  const params = { name: "issues" };
  const issuesDataset = await loadData(params, token);

  if (!issuesDataset)
    res.status(500).json({ message: "Error on getting issues from apimedic" });
  return res.json({
    status: issuesDataset.status,
    issuesDataset: issuesDataset.data,
  });
};

const getOneIssue = async (req, res) => {
  const token = await getToken();
  const params = { name: "issues", id: req.params.id };

  const issue = await loadData(params, token);

  if (!issue)
    res.status(500).json({ message: "Error on getting issues from apimedic" });
  return res.json({ status: issue.status, issue: issue.data });
};

const getDiagnosis = async (req, res) => {
  const token = await getToken();
  const params = {
    name: "diagnosis",
    symptoms: req.query.symptoms,
    gender: req.query.gender,
    yearOfBirth: req.query.yearOfBirth,
  };

  // console.log("params in func:", params)
  const diagnosis = await loadData(params, token);

  if (!diagnosis)
    res
      .status(500)
      .json({ message: "Error on getting diagnosis from apimedic" });
  return res.json({ status: diagnosis.status, diagnosis: diagnosis.data });
};

const getSpecialisations = async (req, res) => {
  const token = await getToken();
  const params = {
    name: "diagnosis/specialisations",
    symptoms: req.query.symptoms,
    gender: req.query.gender,
    yearOfBirth: req.query.yearOfBirth,
  };

  // console.log("params in func:", params)
  const specialisations = await loadData(params, token);

  if (!specialisations)
    res
      .status(500)
      .json({ message: "Error on getting specialisations from apimedic" });
  return res.json({
    status: specialisations.status,
    specialisations: specialisations.data,
  });
};

const getProposedSymptoms = async (req, res) => {
  const token = await getToken();
  const params = {
    name: "symptoms/proposed",
    symptoms: req.query.symptoms,
    gender: req.query.gender,
    yearOfBirth: req.query.yearOfBirth,
  };

  // console.log("params in func:", params)
  const proposedSymptoms = await loadData(params, token);

  if (!proposedSymptoms)
    res
      .status(500)
      .json({ message: "Error on getting proposedSymptoms from apimedic" });
  return res.json({
    status: proposedSymptoms.status,
    proposedSymptoms: proposedSymptoms.data,
  });
};

const getBodyLocations = async (req, res) => {
  const token = await getToken();
  const params = { name: "body/locations" };
  const bodyLocations = await loadData(params, token);

  if (!bodyLocations)
    res
      .status(500)
      .json({ message: "Error on getting bodyLocations from apimedic" });
  return res.json({
    status: bodyLocations.status,
    bodyLocations: bodyLocations.data,
  });
};

const getOneLocation = async (req, res) => {
  const token = await getToken();
  const params = { name: "body/locations", id: req.params.id };

  const location = await loadData(params, token);

  if (!location)
    res
      .status(500)
      .json({ message: "Error on getting locations from apimedic" });
  return res.json({ status: location.status, location: location.data });
};

const getBodySymptoms = async (req, res) => {
  const token = await getToken();
  const params = {
    name: "symptoms",
    locationId: req.query.locationId,
    gender: req.query.gender,
  };

  console.log("params in util:", params);
  const bodySymptoms = await loadData(params, token);

  if (!bodySymptoms)
    res
      .status(500)
      .json({ message: "Error on getting bodySymptoms from apimedic" });
  return res.json({
    status: bodySymptoms.status,
    bodySymptoms: bodySymptoms.data,
  });
};

module.exports = {
  getSymptoms,
  getIssues,
  getOneIssue,
  getDiagnosis,
  getSpecialisations,
  getProposedSymptoms,
  getBodyLocations,
  getOneLocation,
  getBodySymptoms,
};
