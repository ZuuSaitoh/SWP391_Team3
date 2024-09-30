package swp391.com.swp391.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.lang.model.element.Name;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "staff")
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staffId")
    int staffId;
    @Column(name = "username")
    String username;
    @Column(name = "password")
    String password;
    @Column(name = "mail")
    String mail;
    @Column(name = "fullName")
    String fullName;
    @Column(name = "address")
    String address;
    @Column(name = "phone")
    String phone;
    @Column(name = "role")
    String role;
}
