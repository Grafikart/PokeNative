# React Native

- View attention au flex !
- Un text doit être dans un Text
- Reanimate & Moti pour les animations
- Stack de base
```tsx
<Stack
        screenOptions={{
           animation: "slide_from_right",
           animationDuration: 1000,
           contentStyle: {
              backgroundColor: "transparent",
           },
           headerShown: false,
        }}
>
   <Stack.Screen name="index" />
   <Stack.Screen name="pokemon/[id]" />
</Stack>
```

## TODO : 

- Pagination infinie sur la home
- Recherche
- Organisation (nom ou id)
- Press sur l'image déclenche le cri du pokemon
- Tester une connexion lente pour la page d'un pokemon
- Bouton pokemon suivant / pokemon précédent sur la single
- *Slide pour passer au pokemon suivant / précédent
