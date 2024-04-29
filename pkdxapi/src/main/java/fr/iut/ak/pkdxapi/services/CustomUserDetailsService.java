package fr.iut.ak.pkdxapi.services;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;
import fr.iut.ak.pkdxapi.models.UserData;
import fr.iut.ak.pkdxapi.repositories.UserRepository;

// Service pour les rôles
public class CustomUserDetailsService implements UserDetailsService{

    // Récupère le userRepository
    private final UserRepository userRepository;

    // Récupère les différents authorisations
    private List<GrantedAuthority> userAuthorities;
    private List<GrantedAuthority> adminAuthorities;
    
    // Renvoie le rôle
    public CustomUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
        userAuthorities = AuthorityUtils.createAuthorityList("ROLE_USER");        
        adminAuthorities = AuthorityUtils.createAuthorityList("ROLE_ADMIN","ROLE_USER");
    }

    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var data = userRepository.findById(username);
        if(!data.isPresent()) throw new UsernameNotFoundException(username);
        UserData user = data.get();
        List<GrantedAuthority> authorities = user.isAdmin()?adminAuthorities:userAuthorities;
        return new User(user.getLogin(), user.getPassword(),authorities);
    }
    
}
