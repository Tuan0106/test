package com.poly.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
@SuppressWarnings("serial")
@Data
@Entity 
@Table(name = "student")
public class Student implements Serializable{
	@Id
	String ID;
	String Fullname;
	String Phone;
}
