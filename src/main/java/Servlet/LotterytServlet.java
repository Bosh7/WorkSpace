package Servlet;

import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.Random;
import java.util.Set;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/lottery")
public class LotterytServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		//1.生成樂透號碼
		Random random = new Random();//產生隨機樹物件
		Set<Integer> numbers = new LinkedHashSet<>();//放樂透的物件
		while (numbers.size()<5) {
			int number = random.nextInt(39) + 1;//0~38+1
			numbers.add(number);
		}
		//2.生成調度器(分派器)
		RequestDispatcher rd = req.getRequestDispatcher("/lottery2.jsp");
		//3.傳送樂透號碼
		req.setAttribute("numbers", numbers);//裝置要傳送的內容
		rd.forward(req, resp);
		
	}
		
}
