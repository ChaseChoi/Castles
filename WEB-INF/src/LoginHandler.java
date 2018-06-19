import java.io.*;
import java.sql.*;
import java.util.logging.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
// import corresponding packages
import javax.sql.DataSource;
import javax.naming.*;
import chasechoi.UserBean;

@WebServlet("/login")
public class LoginHandler extends HttpServlet {
  private DataSource pool;

  @Override
  public void init(ServletConfig config) throws ServletException {
    super.init(config);
    try {
         // Create a JNDI Initial context to be able to lookup the DataSource
         InitialContext context = new InitialContext();
         // Lookup the DataSource, which will be backed by a pool
         //   that the application server provides.
         pool = (DataSource)context.lookup("java:comp/env/jdbc/mysql_gamecenter");
         if (pool == null)
            throw new ServletException("Unknown DataSource 'jdbc/mysql_gamecenter'");
    } catch (NamingException ex) {
       Logger.getLogger(LoginHandler.class.getName()).log(Level.SEVERE, null, ex);
    }
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
     response.setContentType("text/html;charset=UTF-8");
     PrintWriter out = response.getWriter();
     Connection conn = null;
     Statement stmt = null;
     String username = request.getParameter("username");
     String password = request.getParameter("password");
     UserBean user = new UserBean();
     try {
        conn = pool.getConnection();
        stmt = conn.createStatement();
        // save the password as hash value
        String loginSql = "SELECT * FROM accounts WHERE username=? AND STRCMP(password, PASSWORD(?)) = 0";
        PreparedStatement query = conn.prepareStatement(loginSql);
        query.setString(1, username);
        query.setString(2, password);
        ResultSet rset = query.executeQuery();

        if (rset.next()) {  // list all the authors
           user.setUsername(rset.getString("username"));
           user.setTotal(rset.getInt("total"));
           user.setWin(rset.getInt("win"));
           // TODO: write to session
           HttpSession session = request.getSession();
           session.setAttribute("user", user);
           // TODO: delete this line
           out.print("true");
        } else {
          out.print("false");
        }
     } catch (SQLException ex) {
        out.println("<h3>Service not available. Please try again later!</h3></body></html>");
        Logger.getLogger(LoginHandler.class.getName()).log(Level.SEVERE, null, ex);
     } finally {
        out.close();
        try {
           if (stmt != null) stmt.close();
           if (conn != null) conn.close();
        } catch (SQLException ex) {
           Logger.getLogger(LoginHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
     }
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response)
         throws ServletException, IOException {
    doGet(request, response);
  }
}
