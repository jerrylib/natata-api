export function fetch_abtest_config(req, res) {
  res.status(200).json({
    IS_ADMIN: true
  });
}

export default fetch_abtest_config