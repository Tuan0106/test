package com.poly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.dao.StudentDAO;
import com.poly.entity.Student;





@Controller
public class StudentController {
	@Autowired
	StudentDAO dao;

	@RequestMapping("/nhanvien/index")
	public String index(Model model) {
		Student item = new Student();
		model.addAttribute("item", item);
		List<Student> items = dao.findAll();
		model.addAttribute("items", items);
		return "nhanvien/index";
	}

	@RequestMapping("/nhanvien/edit/{ID}")
	public String edit(Model model, @PathVariable("ID") String ID) {
		Student item = dao.findById(ID).get();
		model.addAttribute("item", item);
		List<Student> items = dao.findAll();
		model.addAttribute("items", items);
		return "nhanvien/index";
	}

	@RequestMapping("/nhanvien/create")
	public String create(Student item) {
		dao.save(item);
		System.out.print(item.getID());
		return "redirect:/nhanvien/index";
	}

	@RequestMapping("/nhanvien/update")
	public String update(Student item) {
		dao.save(item);
		return "redirect:/nhanvien/edit/index" + item.getID();
	}

	@RequestMapping("/nhanvien/delete/{ID}")
	public String create(@PathVariable("ID") String ID) {
		dao.deleteById(ID);
		return "redirect:/nhanvien/index";
	}
//	@RequestMapping("/nhanvien/newcontact")
//	public String newcontact(Model model) {
//		nhanvien item = new nhanvien();
//		model.addAttribute("item", item);
//		return "nhanvien/index";
//	}
}