import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  SectionList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import axios from 'axios';

const CATEGORIES = ['Fiction', 'History', 'Technology'];
const MAX_RESULTS = 120;
const PAGE_SIZE = 40;

const App = () => {
  const [booksByAuthor, setBooksByAuthor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Fiction');
  const [selectedBook, setSelectedBook] = useState(null);
  const [loadingBook, setLoadingBook] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchBooks(selectedCategory);
    setSelectedBook(null);
  }, [selectedCategory]);

  const fetchBooks = async (category) => {
    setLoading(true);
    try {
      let allItems = [];
      for (let start = 0; start < MAX_RESULTS; start += PAGE_SIZE) {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=${PAGE_SIZE}&startIndex=${start}`
        );
        if (!response.data.items || response.data.items.length === 0) break;
        allItems = allItems.concat(response.data.items);
      }
      if (allItems.length === 0) {
        Alert.alert("Sin resultados", "No se encontraron libros.");
        setBooksByAuthor([]);
        setLoading(false);
        return;
      }
      const grouped = groupBooksByAuthor(allItems);
      if (grouped.length === 0) {
        Alert.alert("Sin resultados", "No se encontraron autores con suficientes libros.");
      }
      setBooksByAuthor(grouped);
    } catch (error) {
      Alert.alert("Error de conexión", "No se pudo conectar a la API.");
      console.error(error);
      setBooksByAuthor([]);
    } finally {
      setLoading(false);
    }
  };

  const groupBooksByAuthor = (books) => {
    const authorMap = {};
    books.forEach(book => {
      const volume = book.volumeInfo;
      const authors = volume.authors || ['Autor Desconocido'];
      authors.forEach(author => {
        if (!authorMap[author]) authorMap[author] = [];
        authorMap[author].push({ ...volume, id: book.id });
      });
    });

    return Object.keys(authorMap)
      .filter(author => authorMap[author].length >= 2)
      .map(author => ({
        title: author,
        data: authorMap[author].slice(0, 10), // <= Limita a 10 libros por autor
      }));
  };

  const onSelectBook = (book) => {
    setLoadingBook(true);
    setDownloading(false);
    setTimeout(() => {
      setSelectedBook(book);
      setLoadingBook(false);
    }, 700);
  };

  const onDownloadBook = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      Alert.alert('Descarga completa', 'El libro ha sido descargado exitosamente.');
    }, 2000);
  };

  const renderBook = ({ item }) => (
    <TouchableOpacity
      style={styles.bookContainer}
      onPress={() => onSelectBook(item)}
      disabled={loadingBook || downloading}
      activeOpacity={0.85}
    >
      {item.imageLinks?.thumbnail ? (
        <Image
          source={{ uri: item.imageLinks.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.noThumbnail}>
          <Text style={styles.noThumbnailText}>Sin imagen</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.publisher || 'Editorial no disponible'}</Text>
        <Text style={styles.description} numberOfLines={3}>{item.description || 'Sin descripción'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catálogo de Libros</Text>
      </View>

      <View style={styles.categoryBar}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(cat)}
            disabled={loading || loadingBook || downloading}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.selectedCategoryText
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Cargando libros...</Text>
        </View>
      ) : booksByAuthor.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No hay autores con suficientes libros en esta categoría.</Text>
          <Text style={styles.noResultsTextSmall}>Intenta cambiar la categoría.</Text>
        </View>
      ) : (
        <SectionList
          sections={booksByAuthor}
          keyExtractor={(item, index) =>
            `${item.title}-${item.publisher}-${index}`
          }
          renderItem={renderBook}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.authorHeader}>{title}</Text>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled={!loadingBook && !downloading}
          showsVerticalScrollIndicator={false}
        />
      )}

      {loadingBook && (
        <View style={styles.loadingBookOverlay}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Cargando libro...</Text>
        </View>
      )}

      <Modal
        visible={selectedBook !== null}
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          if (!downloading) setSelectedBook(null);
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              if (!downloading) setSelectedBook(null);
            }}
            activeOpacity={0.7}
            disabled={downloading}
          >
            <Text style={styles.closeButtonText}>Cerrar ✕</Text>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.modalScroll}>
            {selectedBook?.imageLinks?.thumbnail && (
              <Image
                source={{ uri: selectedBook.imageLinks.thumbnail }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            )}
            <Text style={styles.modalTitle}>{selectedBook?.title}</Text>
            <Text style={styles.modalSubtitle}>
              Editorial: {selectedBook?.publisher || 'No disponible'}
            </Text>
            <Text style={styles.modalAuthors}>
              Autor(es): {(selectedBook?.authors || ['Desconocido']).join(', ')}
            </Text>
            <Text style={styles.modalDescription}>
              {selectedBook?.description || 'Sin descripción'}
            </Text>

            <TouchableOpacity
              style={[styles.downloadButton, downloading && styles.downloadButtonDisabled]}
              onPress={onDownloadBook}
              disabled={downloading}
              activeOpacity={0.8}
            >
              <Text style={styles.downloadButtonText}>
                {downloading ? 'Descargando...' : 'Descargar libro'}
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {downloading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text style={styles.loadingText}>Descargando libro...</Text>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

 const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#059669',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  categoryBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    paddingHorizontal: 5,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 25,
    backgroundColor: '#D1FAE5',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedCategory: {
    backgroundColor: '#10B981',
    shadowOpacity: 0.5,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  authorHeader: {
    backgroundColor: '#A7F3D0',
    paddingVertical: 8,
    paddingHorizontal: 14,
    fontSize: 18,
    fontWeight: '700',
    color: '#065F46',
    borderRadius: 6,
    marginHorizontal: 10,
    marginTop: 16,
    marginBottom: 6,
  },
  bookContainer: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  thumbnail: {
    width: 70,
    height: 105,
    borderRadius: 8,
    marginRight: 14,
    backgroundColor: '#ECFDF5',
  },
  noThumbnail: {
    width: 70,
    height: 105,
    backgroundColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderRadius: 8,
  },
  noThumbnailText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  info: { flex: 1, justifyContent: 'center' },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 14,
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
  noResultsTextSmall: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  loadingBookOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 48,
    paddingHorizontal: 20,
  },
  modalScroll: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalImage: {
    width: 230,
    height: 340,
    borderRadius: 14,
    marginBottom: 24,
    backgroundColor: '#D1FAE5',
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 10,
    color: '#065F46',
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 6,
  },
  modalAuthors: {
    fontSize: 15,
    color: '#4B5563',
    fontStyle: 'italic',
    marginBottom: 18,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'justify',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 16,
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },
  closeButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },

  downloadButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 32,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  downloadButtonDisabled: {
    backgroundColor: '#A7F3D0',
    shadowOpacity: 0,
    elevation: 0,
  },
  downloadButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 0.3,
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },

});

export default App;
