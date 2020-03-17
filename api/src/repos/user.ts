import pool from '../infra/db'; 


class UserRepo {
  static findOne = async (email: string, password: string) => {
    const sql = "SELECT * FROM ?? WHERE ?? = ? and ?? = ?";
    const params = ["users", "email", email, "password", password];
    const [result, _] = await pool.query(sql, params);
    pool.end();
    console.log('result', result)
    if (result.length !== 1) { throw [404, 'not found']; }
    return result[0];
  }
}

export default UserRepo;
