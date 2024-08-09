# React Native

L'objectif de ce dépôt est de préparer un tutoriel sur React Native en créant une application "pokedex" en utilisant React Native

- [Maquette](https://www.figma.com/community/file/979132880663340794)
- [API](https://pokeapi.co/docs/v2)

## Découverte

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

## TODO

- Bouton pokemon suivant / pokemon précédent sur la single
- *Slide pour passer au pokemon suivant / précédent
